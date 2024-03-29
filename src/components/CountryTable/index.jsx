import { useState } from 'react'
import Link from 'next/link'
import styles from './Country.module.scss'
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri'
import NotFound from '../result/NotFound'

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
  }

  if (direction === 'desc') {
    return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
  }

  return countries
}

const SortArrow = ({ direction }) => {
  if (!direction) return <></>

  if (direction === 'desc') {
    return <RiArrowDropDownFill />
  } else {
    return <RiArrowDropUpFill />
  }
}

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState(null)
  const [value, setValue] = useState()

  const orderedCountries = orderBy(countries, value, direction)

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc')
    } else if (direction === 'desc') {
      setDirection('asc')
    } else {
      setDirection(null)
    }
  }

  const setValueAndDirection = (value) => {
    switchDirection()
    setValue(value)
  }

  return (
    <>
      <div className={styles.heading}>
        <div className={styles.heading_flag} />
        <button className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}>
          <div>Name</div>
          {value === 'name' && <SortArrow direction={direction} />}
        </button>

        <button className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}>
          <div>Population</div>
          {value === 'population' && <SortArrow direction={direction} />}
        </button>

        <button className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}>
          <div>Area (km <sup style={{ fontSize: '.5rem' }}>2</sup>)</div>
          {value === 'area' && <SortArrow direction={direction} />}
        </button>

        <button className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}>
          <div>Gini</div>
          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries?.length > 0 ?
        orderedCountries?.map(country =>
          <Link href={`/country/${country.alpha3Code}`} key={country?.alpha3Code}>
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={country?.flag} alt={country?.name} />
              </div>
              <div className={styles.name}>{country?.name}</div>
              <div className={styles.population}>{country?.population}</div>
              <div className={styles.area}>{country?.area || '0'} %</div>
              <div className={styles.gini}>
                <div className={styles.progress}>
                  <div className={styles.progress_bar} style={{
                    width: `${country?.gini || '0'}%`,
                    color: `${country?.gini > 0 ? 'var(--background-color)' : 'var(--text-color)'}`
                  }}>
                    {country?.gini || '0'} %
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : <NotFound result="Not Found" />
      }
    </>
  )
}

export default CountryTable

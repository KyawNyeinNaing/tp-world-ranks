import { useEffect, useState } from 'react'
import { Col, Container, Row, Section } from '../../components'
import Layout from '../../layout'
import styles from './Country.module.scss'

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)

  const country = await res.json()

  return country
}

const Country = ({ country }) => {
  const [borders, setBorders] = useState([])

  const getBorders = async () => {
    const borders = await Promise.all(
      country?.borders?.map(border => getCountry(border))
    )

    setBorders(borders)
  }

  useEffect(() => {
    getBorders()
  }, [])

  return (
    <Layout title={country?.name}>
      <Section>
        <Container>
          <Row>
            <Col md='6'>
              <div className={styles.overview_panel}>
                <img src={country?.flag} alt={country?.name} />

                <h1 className={styles.overview_name}>{country?.name}</h1>
                <div className={styles.overview_region}>{country?.region}</div>

                <div className={styles.overview_number}>
                  <div className={styles.overview_population}>
                    <div className={styles.overview_value}>{country?.population}</div>
                    <div className={styles.overview_label}>Population</div>
                  </div>

                  <div className={styles.overview_area}>
                    <div className={styles.overview_value}>{country?.area}</div>
                    <div className={styles.overview_label}>Area</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md='6'>
              <div className={styles.detail_panel}>
                <h4 className={styles.detail_panel_heading}>Details</h4>

                <div className={styles.detail_panel_row}>
                  <div className={styles.detail_panel_label}>Capital</div>
                  <div className={styles.detail_panel_value}>{country?.capital}</div>
                </div>

                <div className={styles.detail_panel_row}>
                  <div className={styles.detail_panel_label}>Language</div>
                  <div className={styles.detail_panel_value}>
                    {country?.languages?.map(language => language?.name).join(', ')}
                  </div>
                </div>

                <div className={styles.detail_panel_row}>
                  <div className={styles.detail_panel_label}>Currencies</div>
                  <div className={styles.detail_panel_value}>
                    {country?.currencies?.map(currency => currency?.name).join(', ')}
                  </div>
                </div>

                <div className={styles.detail_panel_row}>
                  <div className={styles.detail_panel_label}>Native Name</div>
                  <div className={styles.detail_panel_value}>{country?.nativeName}</div>
                </div>

                <div className={styles.detail_panel_row}>
                  <div className={styles.detail_panel_label}>Gini</div>
                  <div className={styles.detail_panel_value}>{country?.gini || 0} %</div>
                </div>

                <div className={styles.detail_panel_borders}>
                  <div className={styles.detail_panel_borders_label}>Neighbouring Countries</div>
                  <div className={styles.detail_panel_borders_wrapper}>
                    {borders?.length > 0 &&
                      borders?.map(({ flag, name }) => (
                        <div className={styles.detail_panel_borders_country} key={name}>
                          <img src={flag} alt={name} />

                          <div className={styles.detail_panel_borders_name}>{name}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Section>
    </Layout>
  )
}

export default Country

export const getStaticPaths = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const countries = await res.json()

  const paths = countries.map(country => ({ params: { id: country.alpha3Code } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id)

  return {
    props: {
      country
    }
  }
}

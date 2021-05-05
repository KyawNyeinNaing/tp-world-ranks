import { useState } from 'react'
import Layout from '../layout'
import { Section, Container, Row, Col } from '../components'
import { SearchInput } from '../components/'
import styles from '../styles/Home.module.scss'
import CountryTable from '../components/CountryTable'

const Home = ({ countries }) => {
  const [keyword, setKeyword] = useState('')

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
  )

  const onInputChange = (e) => {
    e.preventDefault
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Layout title='World Ranks' className='home'>
      <Section>
        <Container>
          <Row>
            <Col md='3'>
              <h5 className={styles.search_label}>Search Country</h5>
            </Col>
            <Col md='9'>
              <SearchInput
                placeholder='Filter by Name, Region or SubRegion'
                onChange={onInputChange}
              />

              <div className={styles.counts}>
                {filteredCountries?.length > 0 && <span>Found {filteredCountries.length} {filteredCountries.length <= 1 ? 'country' : 'countries'}</span>}
              </div>

            </Col>
          </Row>
        </Container>
      </Section>

      <Section>
        <Container>
          <Row>
            <Col space='12'>
              <CountryTable countries={filteredCountries} />
            </Col>
          </Row>
        </Container>
      </Section>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all')

  const countries = await res.json()

  return {
    props: {
      countries
    }
  }
}

export default Home

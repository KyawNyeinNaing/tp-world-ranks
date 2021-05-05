import styles from './SearchInput.module.scss'
import { IoSearch } from 'react-icons/io5'

const SearchInput = ({ ...props }) => {
  return (
    <div className={styles.wrapper}>
      <IoSearch color='inherit' />
      <input className={styles.input} {...props} />
    </div>
  )
}

export default SearchInput

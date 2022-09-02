import PropTypes from 'prop-types'

const Header = ({ title }) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}
Header.defaultProps = {
    title: 'Line Chart'
}


Header.propTypes = {
    title: PropTypes.string
}



export default Header


/*<h1 style={headingStyle}>{title}</h1> this is for styling
CSS IN JS
const headingStyle = {
    color: 'red'
    , backgroundColor: 'black'
 }*/
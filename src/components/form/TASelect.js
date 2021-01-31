import { Select } from 'antd'
import React from 'react'
import { connect } from 'react-redux'

const TASelect = (props) => {
    return (
        <Select>
            {props.assistants}
        </Select>
    )
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(TASelect)

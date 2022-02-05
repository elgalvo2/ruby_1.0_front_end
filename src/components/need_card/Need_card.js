import React from 'react';
import './need_card.css'
import PropTypes from 'prop-types'
import { Tooltip } from '@material-ui/core'

export default function Need_card({ props = {
    provider: 'Los olivos',
    use: 'Uso ludico',
    bill_no: 'A-1111',
    amount: '$000.00',
    date: 'dd/mm/aaaa',
    property: 'no'
}, methods }) {



    return (
        <>
            <Tooltip title={'Uso: '+props.use}>
                <div className='needCard'>

                    <div className='provider'>
                        <p>{props.provider}</p>
                    </div>
                    {/* <div className='use'>
                <p>{props.use}</p>
            </div> */}
                    <div className='footer'>
                        <div>
                            <p>{props.bill_no}</p>
                            <p>{props.amount}</p>
                        </div>
                        <div>
                            <p>{props.date}</p>
                            <p>{props.property}</p>
                        </div>
                    </div>
                    <div className='clearFix'></div>
                </div>
             </Tooltip> 
        </>
    )
}

Need_card.propTypes = {
    props: PropTypes.object
}


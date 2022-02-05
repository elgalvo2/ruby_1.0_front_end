import React from 'react';
import styles from './Visor.module.css'
import Need_card from '../../need_card/Need_card'


export default function Visor({ adjudicaciones = {
    autorizadas: [{}, {}],
    aprobadas: [{
        provider: 'Casa Ley S.A. de C.V.',
        use: 'dalskjd kladjsdaskld jad kjadkljdkljlksda daslkd ladjkasdjdklsjd adj lakdsdk dkas dkasjd ljdskl jdlaksjd lasjd klajdlas kjdlaskjdl kasjdlaskdjalkdjas lkjdlas kdfjdklfjas ldkfjasdlkfjs l dal ksjflkjfkasd jhkfhkfhakfj hdkj hfsa',
        bill_no: 'A-2300',
        amount: '$2200.00',
        date: '12/02/2022',
        property: 'no'
    }],
    firmas: [{}, {}, {}],
    pagadas: [{}]
}, methods }) {

    return (
        <div className={styles.visor}>
            <div className={styles.campo}>
                <p>Definicion</p>
                {adjudicaciones.autorizadas.map((adj) =>
                    <button onClick={() => methods.handleOpenAdModal(true)}>
                        <Need_card />
                    </button>
                )}
            </div>
            <div className={styles.campo}>
                <p>Autorizacion</p>
                {adjudicaciones.aprobadas.map((adj) =>
                    <button onClick={() => methods.handleOpenAdModal(true)}>
                        <Need_card />
                    </button>
                )}
            </div>
            <div className={styles.campo}>
                <p>Desarrollo</p>
                {adjudicaciones.firmas.map((adj) =>
                    <button onClick={() => methods.handleOpenAdModal(true)}>
                        <Need_card />
                    </button>
                )}
            </div>
            <div className={styles.campo}>
                <p>Desahogo</p>
                {adjudicaciones.pagadas.map((adj) =>
                    <button onClick={() => methods.handleOpenAdModal(true)}>
                        <Need_card />
                    </button>
                )}
            </div>
        </div>
    )
}
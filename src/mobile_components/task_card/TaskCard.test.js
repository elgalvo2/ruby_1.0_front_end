import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import TaskCard from './TaskCard'




describe('Test on TaskCard',()=>{

    test('renders the component correctly',()=>{

        const label = 'descripcion por defecto'

        const view = render(<TaskCard/>)

        expect(view.getByText(label)).toBeInTheDocument();

        
    })
})

import React, { Component, Fragment } from 'react';

import List from './list'
import Form from './form'


class Index extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-4'><Form /></div>
                <div className='col'><List /></div>
            </div>
        )
    }

}

export default Index;
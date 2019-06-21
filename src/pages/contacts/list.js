import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listContacts, getContact } from '../../actions/contacts';


class List extends Component {

    componentDidMount() {

        this.props.listContacts()

    }

    getContact = (idContact) => {
        this.props.getContact(idContact);
    }

    render() {

        let { loading, contacts, contact } = this.props;
        const { error, data } = contacts;
        const contactSelected = contact.data;

        console.log(data);

        return (
            <Fragment>

                {(loading) && 'carregando..'}
                {(error) && 'erro ao solicitar os dados'}

                <ul className="list-group">
                    {data.map((contact, index) => {
                        return (
                            <li className={(contactSelected && contactSelected.idContact === contact.idContact) ? 'list-group-item active' : 'list-group-item'} key={index} onClick={() => {
                                this.getContact(contact.idContact)
                            }}>
                                {contact.idContact} -  {contact.name}
                            </li>
                        )
                    })}
                </ul>

                {(!loading && data && data.length < 1) && 'Nenhum contato cadastrado'}

            </Fragment>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        loading: state.contactsReducer.loading,
        contacts: state.contactsReducer.contacts,
        contact : state.contactsReducer.contact
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({ listContacts, getContact }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List)
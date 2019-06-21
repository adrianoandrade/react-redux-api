import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createContact, setContact, updateContact, deleteContact } from '../../actions/contacts';


class Form extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    delete = async () => {
        let { contact } = this.props;
        contact = contact.data;
        await this.props.deleteContact(contact);
        this.reset();
    }

    send = async () => {

        let { contact } = this.props;
        contact = contact.data;

        if (contact.idContact) {
            await this.props.updateContact(contact)
        } else {
            await this.props.createContact(contact);
        }

        this.reset()
    }

    reset = () => {
        this.props.setContact({ data: {} })
    }


    render() {

        const { loading, contact } = this.props;
        let { error, data } = contact;

        return (
            <Fragment>

                {(loading) && 'carregando..'}
                {(error) && 'erro ao solicitar os dados'}

                <div className="form-group">
                    <input value={(data && data.name) ? data.name : ''}
                        onChange={(e) => {
                            const { value } = e.target;
                            data.name = value;
                            this.props.setContact({ data });
                        }} type="text"
                        className="form-control" placeholder="Nome completo" />
                </div>

                <div className="form-group">

                    <button style={{ marginRight: '10px' }} type="button"
                        onClick={() => { this.send(); }}
                        className="btn btn-primary">
                        {(data && data.idContact) ? 'Atualizar' : 'Cadastrar'}
                    </button>

                    {(data && data.idContact) &&
                        <Fragment>
                            <button style={{ marginRight: '10px' }} type="button"
                                onClick={() => { this.reset(); }}
                                className="btn btn-secondary">
                                Cancelar
                            </button>
                            <button style={{ marginRight: '10px' }} type="button"
                                onClick={() => { this.delete(); }}
                                className="btn btn-danger">
                                Exlcuir
                            </button>
                        </Fragment>
                    }

                </div>

            </Fragment>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        loading: state.contactsReducer.loading,
        contact: state.contactsReducer.contact
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({
    setContact, updateContact, deleteContact, createContact
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)
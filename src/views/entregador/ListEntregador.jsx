import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador () {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [openView, setOpenView] = useState(false);
    const [idView, setIdView] = useState();
    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
        .then((response) => {
            setLista(response.data)
        })
    }
    function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}

function confirmaRemover(id) {
    setOpenModal(true)
    setIdRemover(id)
}

function confirmarVisualizar(id) {
    setOpenView(true)
    setIdView(id)
}

function carregarEntregador() {

    axios.get("http://localhost:8080/api/entregador/" + idView)
    .then((response) => {
        setLista(response.data)
    })
}

async function remover() {

    await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
    .then((response) => {

        console.log('Entregador removido com sucesso.')

        axios.get("http://localhost:8080/api/entregador")
        .then((response) => {
            setLista(response.data)
        })
    })
    .catch((error) => {
        console.log('Erro ao remover um entregador.')
    })
    setOpenModal(false)
}
    return(
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{marginTop: '4%'}}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
            <br/><br/><br/>
                    
                    <Table color='orange' sortable celled>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>CPF</Table.HeaderCell>
                                <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    
                        <Table.Body>

                            { lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                        <Link to="/form-entregador" state={{id: entregador.id}} style={{color: 'green'}}>
                                        <Button
                                            inverted
                                            circular
                                            color='green'
                                            title='Entregador aqui para editar os dados deste entregador'
                                            icon>
                                                <Icon name='edit' />
                                        </Button> &nbsp;
                                        </Link>
                                        
                                        <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}>
                                                    <Icon name='trash' />
                                        </Button>&nbsp;

                                        <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmarVisualizar(entregador.id)}
                                                >
                                                    <Icon name='eye' />
                                        </Button>&nbsp;

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                                </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='eye' />
                    <div style={{marginTop: '5%'}}> TABELA DE VISUALIZAR DADOS DO ENTREGADOR </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> fechar
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
                {/* VISUALIZAR */}
            <Modal
                basic
                onClose={() => setOpenView(false)}
                onOpen={() => setOpenModal(true)}
                open={openView}
            >
                <Header icon>
                    <Icon name='eye' />
                    <div style={{marginTop: '5%'}}>
                        <Table color='orange' sortable celled>

                    <Table.Body>

                        { lista.map(entregador => (

                                <Table.Row key={entregador.id}>
                                    <Table.Cell>
                                        Nome: {entregador.nome}<br></br>
                                        Cpf: {entregador.cpf}<br></br>
                                        Data de Nascimento: {formatarData(entregador.dataNascimento)}<br></br>
                                        Celular: {entregador.foneCelular}<br></br>
                                        Fixo: {entregador.foneFixo}<br></br>
                                        Rg: {entregador.rg}<br></br>
                                        Entregas Realizadas: {entregador.entregasRealizadas}<br></br>
                                    </Table.Cell>
                                    
                                </Table.Row>
                            ))}

                            </Table.Body>
                    </Table>
                    </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenView(false)}>
                        <Icon name='remove' /> Fechar
                    </Button>

                </Modal.Actions>
            </Modal>
        </div>
    )
}

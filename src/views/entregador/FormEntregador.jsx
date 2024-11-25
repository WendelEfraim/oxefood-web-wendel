import axios from "axios";
import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Select, Radio } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";
import { Link,useLocation } from "react-router-dom";

export default function FormCliente () {

    const { state } = useLocation();
    const [idEntregador, setEntregador] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
.then((response) => {
                        setEntregador(response.data.id)
                        setNome(response.data.nome)
                        setCpf(response.data.cpf)
                        setDataNascimento(response.data.dataNascimento)
                        setFoneCelular(response.data.foneCelular)
                        setFoneFixo(response.data.foneFixo)
            })
        }
}, [state])

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo
        }

        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
            .then((response) => { console.log('Entregador alterado com sucesso.') })
            .catch((error) => { console.log('Erro ao alter um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => { console.log('Entregador cadastrado com sucesso.') })
            .catch((error) => { console.log('Erro ao incluir o entregador.') })
        }
}

    return (

        <div>

        <MenuSistema tela={'entregador'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={6}>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={6}>
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={4}>
                                    <InputMask
                                        mask="99/99/9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QT Entregas Realizadas'
                                    width={4}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={4}>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>
                                
                                <Form.Input
                                    fluid
                                    label='Rua'>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Bairro'>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={4}>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='UF'>
                                        <Select
                                            placeholder="Selecione"
                                            width={80}>

                                        </Select>

                                </Form.Input>
                            </Form.Group>
                            
                            <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Complemento'>
                                    </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                label='Ativo:'>
                                    &nbsp;
                                    <Radio
                                        label='Sim'
                                        name='radioGroup'
                                        value='this'
                                    />
                                    &nbsp;
                                    &nbsp;
                                    <Radio
                                        label='Não'
                                        name='radioGroup'
                                        value='this'
                                    />
                                    &nbsp;
                                </Form.Input>
                            </Form.Group>
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Link to={'/list-cliente'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}

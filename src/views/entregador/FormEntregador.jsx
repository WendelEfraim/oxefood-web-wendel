import axios from "axios";
import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Select, Radio } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";
import { Link,useLocation } from "react-router-dom";

export default function FormCliente () {

    const { state } = useLocation();
    const [idEntregador, setEntregador] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [rg, setRG] = useState();
    const [entregasRealizadas, setEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [rua, setRua] = useState();
    const [numeroEndereco, setNumeroEndereco] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [ativo, setAtivo] = useState();
    

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
                        setRG(response.data.rg)
                        setEntregasRealizadas(response.data.entregasRealizadas)
                        setValorFrete(response.data.valorFrete)
                        setRua(response.data.rua)
                        setNumeroEndereco(response.data.numeroEndereco)
                        setBairro(response.data.bairro)
                        setCidade(response.data.cidade)
                        setCep(response.data.cep)
                        setUf(response.data.uf)
                        setComplemento(response.data.complemento)
                        setAtivo(response.data.ativo)
            })
        }
}, [state])


    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            rg: rg,
            entregasRealizadas: entregasRealizadas,
            valorFrete: valorFrete,
            rua: rua,
            numeroEndereco: numeroEndereco,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            uf: uf,
            complemento: complemento,
            ativo: ativo
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
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={6}>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={6}
                                    onChange={e => setRG(e.target.value)}
                                    >
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={4}>
                                    <InputMask
                                        mask="99/99/9999"
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Fixo'
                                    width={6}
                                    onChange={e => setFoneFixo(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QT Entregas Realizadas'
                                    width={4}
                                    onChange={e => setEntregasRealizadas(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={4}
                                    onChange={e => setValorFrete(e.target.value)}
                                    >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>
                                
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    onChange={e => setRua(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    onChange={e => setNumeroEndereco(e.target.value)}
                                    >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    onChange={e => setBairro(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    onChange={e => setCidade(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={4}
                                    onChange={e => setCep(e.target.value)}
                                    >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='UF'
                                    onChange={e => setUf(e.target.value)}
                                    >
                                        <Select
                                            placeholder="Selecione"
                                            width={80}>

                                        </Select>

                                </Form.Input>
                            </Form.Group>
                            
                            <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Complemento'
                                        onChange={e => setComplemento(e.target.value)}
                                        >
                                    </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                label='Ativo:'
                                onChange={e => setAtivo(e.target.value)}
                                >
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

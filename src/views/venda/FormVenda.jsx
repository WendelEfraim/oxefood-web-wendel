import axios from "axios";
import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Select, Radio } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";
import { Link,useLocation } from "react-router-dom";


export default function FormVenda () {

    const { state } = useLocation();
    const [idVenda, setIdVenda] = useState();
    

    const status = [
        { key: 'pc', value: 'pc', text: 'Pedido Cancelado' },
        { key: 'ap', value: 'ap', text: 'Aguardando Pagamento' },
        { key: 'pg', value: 'pg', text: 'Pago' },
        { key: 'et', value: 'et', text: 'Entregue' },
    ];


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/venda/" + state.id)
.then((response) => {
                        setIdVenda(response.data.id)
                        setCliente(response.data.cliente)
                        setProduto(response.data.produto)
                        setDataVenda(formatarData(response.data.dataVenda))
                        setValorTotal(response.data.valorTotal)
                        setObservacao(response.data.observacao)
                        setRetiradaEmLoja(response.data.retiradaEmLoja)
            })
        }
}, [state])

    const [cliente, setCliente] = useState();
    const [produto, setProduto] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [valorTotal, setValorTotal] = useState();
    const [observacao, setObservacao] = useState();
    const [retiradaEmLoja, setRetiradaEmLoja] = useState();
    

    function salvar() {

        let vendaRequest = {
            cliente: cliente,
            produto: produto,
            dataVenda: dataVenda,
            valorTotal: valorTotal,
            observacao: observacao,
            retiradaEmLoja: retiradaEmLoja,
        }

        if (idVenda != null) { //Alteração:
            axios.put("http://localhost:8080/api/venda/" + idVenda, vendaRequest)
            .then((response) => { console.log('Venda alterado com sucesso.') })
            .catch((error) => { console.log('Erro ao alter um venda.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/venda", vendaRequest)
            .then((response) => { console.log('venda cadastrado com sucesso.') })
            .catch((error) => { console.log('Erro ao incluir o venda.') })
        }
}

function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}

    return (

        <div>
            { idVenda === undefined &&
                <h2> <span style={{color: 'darkgray'}}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
            }
            { idVenda !== undefined &&
                <h2> <span style={{color: 'darkgray'}}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
            }

            <MenuSistema tela={'venda'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Cliente'
                                    maxLength="100"
                                    value={cliente}
			                        onChange={e => setCliente(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Produto'
                                    value={produto}
                                    onChange={e => setProduto(e.target.value)}
                                    >
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Valor da venda'
                                    width={6}
                                    onChange={e => setValorTotal(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data da venda'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        value={dataVenda}
                                        placeholder="Ex: 20/03/1985"
                                        onChange={e => setDataVenda(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Status da Venda'
                                    
                                >
                                    <Select
                                    options={status}
                                    placeholder="Selecione"
                                    width={80}
                                    
                                    >
                                    </Select>

                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Retirar na loja?'
                                    value={retiradaEmLoja}
                                    
                                >
                                    &nbsp;
                                    <Radio
                                        label='Sim'
                                        name='radioGroup'
                                        value='this'
                                        onChange={e => setRetiradaEmLoja(true)}
                                        checked={retiradaEmLoja === true}
                                    />
                                    &nbsp;
                                    &nbsp;
                                    <Radio
                                        label='Não'
                                        name='radioGroup'
                                        value='this'
                                        onChange={e => setRetiradaEmLoja(false)}
                                        checked={retiradaEmLoja === false}
                                    />
                                    &nbsp;
                                </Form.Input>
                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>
                            
                        <Link to={'/list-venda'}>
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

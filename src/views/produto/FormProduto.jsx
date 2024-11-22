import React from "react";
import { Button, Container, Divider, Form, Icon, TextArea} from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";

export default function FormCliente () {

    return (

        <div>
            
            <MenuSistema tela={'produto'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    width={8}
                                    label='Codigo do Produto'>
                                </Form.Input>

                            </Form.Group >
                            
                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Descirção'
                                    >
                                    <TextArea placeholder='Informe a descrição do produto' />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                        required
                                        fluid
                                        label='Valor Unínatario'
                                        >
                                </Form.Input> 

                                <Form.Input
                                        fluid
                                        label='Tempo de Entrega Mínimo em Minutos'
                                        >
                                </Form.Input>
                                
                                <Form.Input
                                        fluid
                                        label='Tempo de Entrega Máximo em Minutos'
                                        >
                                </Form.Input>          
                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

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
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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

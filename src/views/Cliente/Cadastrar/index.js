import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";


export const CadastrarCliente = () => {

    const [cliente, setCliente] = useState ({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente ({
        ...cliente,[e.target.name]: e.target.value
    });

    const cadCliente = async e =>{
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/clientes/cadastrar",cliente,{headers})
        .then((response)=>{
            //console.log(response.data.message);
            if (response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            } else {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        })
        .catch(() =>{
            console.log("Erro: Sem conexão com a API.")
        })
    }




    return (
        <Container>
            <div className="d-flex">
                <div>
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/cliente/lista"
                        className="btn btn-outline-success btn-sm">Listar Clientes</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input type="text" name="nome" placeholder="Nome do Cliente"
                        onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Endereço
                    </Label>
                    <Input type="text" name="endereco" placeholder="Endereço do Cliente"
                        onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Cidade
                    </Label>
                    <Input type="text" name="cidade" placeholder="Cidade do Cliente"
                        onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        UF
                    </Label>
                    <Input type="text" name="uf" placeholder="Cidade do Cliente"
                        onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Data de Nascimento
                    </Label>
                    <Input type="text" name="nascimento" placeholder="Data de Nascimento do Cliente"
                        onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Cliente Desde
                    </Label>
                    <Input type="text" name="clienteDesde" placeholder="Data de Cadastro do Cliente"
                        onChange={valorInput}/>
                </FormGroup>


                <Button type="submit" outline color="success">
                    Cadastar Cliente
                </Button>
                <Button type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>
    );
};
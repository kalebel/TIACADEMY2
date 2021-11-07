import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedidos/editar/" + id,
            { id, data, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso!'
                })
                console.log(response.data.type);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios(api+"/pedidos/"+id)
                .then((response) => {
                    setId(response.data.pedido.id);
                    setData(response.data.pedido.data);
                    setClienteId(response.data.pedido.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível se conectar a API AAKAKAKAKAKKAS")
                })
        }
        getPedido();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/pedido/lista" className="m=auto btn btn-outline-primary btn-sm">
                            Lista Pedidos
                        </Link>
                    </div>
                    <hr className="m-1" />
                    <div>
                        {status.type === 'error' ? <Alert color="danger">
                            {status.message}</Alert> : " "}
                        {status.type === 'success' ? <Alert color="success">
                            {status.message}</Alert> : " "}
                    </div>
                </div>
                <div>
                    <Form className="p-2" onSubmit={edtPedido}>

                        <FormGroup className="p-2">
                            <Label>
                                ID do Pedido
                            </Label>
                            <Input
                                name="id"
                                placeholder="ID do Pedido"
                                type="text"
                                defaultValue={id}
                            />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>
                                Data do Pedido
                            </Label>
                            <Input
                                name="data"
                                placeholder="Data do Pedido"
                                type="text"
                                value = {data}
                                onChange={e => setData(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>
                                ID do Cliente
                            </Label>
                            <Input
                                name="ClienteId"
                                placeholder="ID do Cliente"
                                type="text"
                                defaultValue={ClienteId}
                            />
                        </FormGroup>

                        <FormGroup className="d-flex">
                            <Button type="submit" outline color="warning">
                                Cadastar Cliente
                            </Button>
                            <Button type="reset" outline color="success">
                                Limpar
                            </Button>
                        </FormGroup>

                    </Form>
                </div>
            </Container>
        </div>
    );
};
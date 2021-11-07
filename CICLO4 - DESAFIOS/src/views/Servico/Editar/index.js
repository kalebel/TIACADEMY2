import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/servicos/editar/" + id,
            { id, nome, descricao }, { headers })
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
        const getServico = async () => {
            await axios(api+"/servicos/"+id)
                .then((response) => {
                    setId(response.data.servico.id);
                    setNome(response.data.servico.nome);
                    setDescricao(response.data.servico.descricao);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível se conectar a API AAKAKAKAKAKKAS")
                })
        }
        getServico();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/servico/lista" className="m=auto btn btn-outline-primary btn-sm">
                            Lista de Serviços
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
                    <Form className="p-2" onSubmit={edtServico}>

                        <FormGroup className="p-2">
                            <Label>
                                ID do Serviço
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
                                Nome do Serviço
                            </Label>
                            <Input
                                name="nome"
                                placeholder="Nome do Serviço"
                                type="text"
                                value = {nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>
                                Descrição do Serviço
                            </Label>
                            <Input
                                name="descricao"
                                placeholder="Descrição do Serviço"
                                type="text"
                                value = {descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="d-flex">
                            <Button type="submit" outline color="warning">
                                Editar Serviço
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
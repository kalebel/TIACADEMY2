import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ComprasDoProduto = (props) => {

    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/produto/"+id+"/compras")
        .then((response) => {
            console.log(response.data.item);
            setData(response.data.item);
        })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API")
            })
    }

    useEffect(() => {
        getItens();
    }, [id]);

    return (
        <Container>
            <div>
                <h1>Compras do Produto: {id}</h1>
            </div>
            {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
            <Table striped>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Visualizar Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.ProdutoId}>
                            <th>{item.CompraId}</th>
                            <td>{item.quantidade}</td>
                            <td>{item.valor}</td>
                            <td className="text-center/">
                                <Link to={"/listar-compra/"}
                                className="btn btn-outline-primary btn-sm">
                                    Consultar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
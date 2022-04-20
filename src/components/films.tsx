import Film, { filmObj } from "./film";

interface FilmsProps {
    films : Array<filmObj>
}

const Films : React.FC<FilmsProps> = ({films}) => {

    const buildRows = () => {
        let rows : Array<JSX.Element> = [];
        films.forEach((film,index) => {
            rows.push(<Film key={index} film={film} />)
        });
        return rows;
    }

    return (
        <div className="films">
            {buildRows()}
        </div>
    )
}

export default Films;
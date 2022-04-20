export interface filmObj{
	_id: number;
	title: string;
    description: string;
	image: string;
}

export interface FilmProps {
    film : filmObj;
}

const Film : React.FC<FilmProps> = ( {film}) => 
{

    // default image
    let imageSrc = "https://picsum.photos/300/200/?blur";
    if (film.image) {
        imageSrc = film.image;
    };

    // locater testid (no spaces)
    const testid = film.title.split(' ').join('');

    return (
        <div className="film-item">
            <img className="film-item__img" src={imageSrc} alt={film.title} height="120"/>
            <h2 data-testid={testid}>{film.title}</h2>
            <p> {film.description} </p>
        </div>
    )
};

export default Film;
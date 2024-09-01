
export function setBook(author,isbn,img_uri,title,olid,genre,synopsis,releaseDate){
    let book = {
        "Author": author,
        "ISBN": isbn,
        "ImgURL": img_uri,
        "Title": title,
        "OLID": olid,
        "genre":genre,
        "synopsis":synopsis,
        "releaseDate":releaseDate
    }
    return book 
}




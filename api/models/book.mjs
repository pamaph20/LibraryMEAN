
export function setBook(author,isbn,img_uri,title,olid){
    let book = {
        "Author": author,
        "ISBN": isbn,
        "ImgURL": img_uri,
        "Title": title,
        "OLID": olid
    }
    return book 
}




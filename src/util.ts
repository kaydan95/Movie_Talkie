export function makeImage(id:string, size?:string){
    return `https://image.tmdb.org/t/p/${size ? size : "original"}/${id}`;
}
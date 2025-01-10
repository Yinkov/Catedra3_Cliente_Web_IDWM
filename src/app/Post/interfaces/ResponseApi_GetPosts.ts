export interface ResponseAPIGetPosts {
  total:        number;
  paginaActual: number;
  tamañoPagina: number;
  posts:        Post[];
}

export interface Post {
  id:              number;
  title:           string;
  publicationDate: Date;
  linkImage:       string;
}

class apiKlaidos {
  constructor(kodas, pranesimas) {
    this.kodas = kodas;
    this.pranesimas = pranesimas;
  }

  static blogaUzklausa(pranesimas) {
    return new apiKlaidos(400, pranesimas);
  }

  static blogiDuomenys(pranesimas) {
    return new apiKlaidos(469, pranesimas);
  }

  static vidineKlaida(pranesimas) {
    return new apiKlaidos(500, pranesimas);
  }

  static neautorizuotasVartotojas(pranesimas) {
    return new apiKlaidos(401, pranesimas);
  }

  static blogasTokenas(pranesimas) {
    return new apiKlaidos(403, pranesimas);
  }

  static sekmingasIstrinimas(pranesimas) {
    return new apiKlaidos(204, pranesimas);
  }
}

module.exports = apiKlaidos;

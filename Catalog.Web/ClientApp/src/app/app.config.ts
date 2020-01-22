class Configuration {
    constructor(public lang: string, public baseUrl) {

    }
}

export const config: Configuration = new Configuration('en','api'); 

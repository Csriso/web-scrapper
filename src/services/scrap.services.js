import service from "./config.services";

const scrapService = (data) => {
    return service.post("/scrap", data);
}

const submitScrapService = (data) => {
    return service.post("/scrap/submitScrap", data);
}

export {
    scrapService,
    submitScrapService
}
import service from "./config.services";

const scrapService = (data) => {
    return service.post("/scrap", data);
}

const submitScrapService = (data) => {
    return service.post("/scrap/submitScrap", data);
}

const getWebsService = (data) => {
    return service.get("/scrap/getWebs");
}

const getCategoriesService = (data) => {
    return service.post("/scrap/getCategories", data);
}

export {
    scrapService,
    submitScrapService,
    getWebsService,
    getCategoriesService
}
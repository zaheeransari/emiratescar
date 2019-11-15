export class City
{
    cityID:number;
    cityName: string;
    countryID: number;
    
    constructor(cityIDParam:number, cityNameParam: string,countryIDParam: number,)
    {        
        this.cityID = cityIDParam;
        this.cityName = cityNameParam;
        this.countryID = countryIDParam;
    }
}

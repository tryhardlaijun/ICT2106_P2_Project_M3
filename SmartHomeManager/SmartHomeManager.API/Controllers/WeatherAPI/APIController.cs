﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SmartHomeManager.Domain.APIDomain.Entities;
using SmartHomeManager.Domain.APIDomain.Interface;
using SmartHomeManager.Domain.APIDomain.Service;
using SmartHomeManager.Domain.DirectorDomain.Services;

namespace SmartHomeManager.API.Controllers.WeatherAPI
{
	[Route("api/Test")]
	[ApiController]
	public class APIController : ControllerBase { 
		public readonly APIDataServices _apiServices;
		
		public APIController(IAPIDataRepository dataRepository, IAPIKeyRepository keyRepository, IAPIValueRepository valueRepository)
		{
			_apiServices = new(dataRepository,keyRepository, valueRepository);
		}


		[HttpGet("getAPIData")]
		public async Task GetAlltest()
		{
			await _apiServices.getAPIData();
		}


	}
}

﻿using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SmartHomeManager.Domain.BackupDomain.Entities;
using SmartHomeManager.Domain.BackupDomain.Entities.DTOs;
using SmartHomeManager.Domain.BackupDomain.Interfaces;
using SmartHomeManager.Domain.BackupDomain.Services;
using SmartHomeManager.Domain.Common;
using SmartHomeManager.Domain.SceneDomain.Entities;
using SmartHomeManager.Domain.SceneDomain.Interfaces;
using System.Threading.Tasks;

namespace SmartHomeManager.API.Controllers.BackupAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class BackupController : ControllerBase
    {
        private readonly BackupServices _backupServices;

        public BackupController(IBackupRuleRepository backupRuleRepo, IBackupScenarioRepository backupScenarioRepo, IBackupRulesService backupRulesService, IBackupScenariosService backupScenariosService)
        {
            _backupServices = new(backupRuleRepo, backupScenarioRepo, backupRulesService, backupScenariosService);
        }
        
        
        [HttpPost("restoreBackup")]
        public async Task<ActionResult> restoreBackup([FromBody]BackupRuleWebRequest backupRuleRequest) //public async Task<List<Rule>> loadBackupRule(Guid scenarioId)
        {
            var scenarios = await _backupServices.loadBackupScenario(backupRuleRequest.profileId, backupRuleRequest.scenarioIdList);
            var rules = await _backupServices.loadBackupRule(backupRuleRequest.profileId, backupRuleRequest.backupId, backupRuleRequest.scenarioIdList); //backupRuleRequest.profileId, 
            if (rules != null && scenarios != null) {
                return Ok(rules);
            }
            else
            {
                return BadRequest("restoreBackup failed");
            }
        }

        //for fetch scenarios to display in frontend accordion
        [HttpGet("getAllBackupScenario/{profileId}")]
        public async Task<IEnumerable<BackupScenario>> getAllBackupScenarioByProfileID(Guid profileId)
        {
            return await _backupServices.getAllBackupScenarioByProfileId(profileId);
        }
    }
}

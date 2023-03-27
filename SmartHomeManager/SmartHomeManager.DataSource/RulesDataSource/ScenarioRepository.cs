﻿using System;
using System.Data;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SmartHomeManager.Domain.Common;
using SmartHomeManager.Domain.RoomDomain.Entities;
using SmartHomeManager.Domain.SceneDomain.Entities;
using SmartHomeManager.Domain.SceneDomain.Interfaces;

namespace SmartHomeManager.DataSource.RulesDataSource
{
	public class ScenarioRepository: IScenarioRepository<Scenario>
	{
        private readonly ApplicationDbContext _applicationDbContext;
        protected DbSet<Scenario> _dbSet;
        public ScenarioRepository(ApplicationDbContext applicationDbContext)
		{
            _applicationDbContext = applicationDbContext;
            this._dbSet = _applicationDbContext.Set<Scenario>();
        }

        public async Task<bool> AddAsync(Scenario scenario)
        {
            try
            {
                //await RuleSeedData.Seed(_applicationDbContext);
                await _applicationDbContext.AddRangeAsync(scenario);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Scenario scenario)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            try
            {
                Scenario? scenario = await _applicationDbContext.Scenarios.FindAsync(id);
                if (scenario != null)
                {
                    _applicationDbContext.Scenarios.Remove(scenario);
                    return await SaveAsync();
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Scenario>> GetAllAsync()
        {
            return await _applicationDbContext.Scenarios.Include(p => p.Profile).ToListAsync();
        }

        public async Task<Scenario?> GetByIdAsync(Guid id)
        {
            try
            {
                var scenario = await _applicationDbContext.Scenarios.Include(p => p.Profile).FirstAsync(s => s.ScenarioId == id);
                return scenario;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> SaveAsync()
        {
            try
            {
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(Scenario scenario)
        {
            try
            {
                _applicationDbContext.Update(scenario);
                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }
        
        public async Task<Scenario?> GetByNameAsync(string name)
        {
            try
            {
                var scenario = await _applicationDbContext.Scenarios.FirstOrDefaultAsync(s => s.ScenarioName == name);
                Console.WriteLine(scenario.ScenarioName);
                return scenario;
            }
            catch
            {
                return null;
            }
        }
        
    }
}


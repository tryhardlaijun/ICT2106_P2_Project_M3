﻿using Microsoft.EntityFrameworkCore;
using SmartHomeManager.Domain.Common;
using SmartHomeManager.Domain.SceneDomain.Entities;



namespace SmartHomeManager.DataSource.RulesDataSource
{
	public class RuleRepository : IGenericRepository<Rule>
	{
        private readonly ApplicationDbContext _applicationDbContext;

        public RuleRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            
        }

        // Add rule
        public async Task<bool> AddAsync(Rule rule)
        {
            try
            {
                
                await _applicationDbContext.Rules.AddAsync(rule);
                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public Task<bool> DeleteAsync(Rule entity)
        {
            throw new NotImplementedException();
        }

        // Delete by Id
        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            try
            {
                Rule? rule = await _applicationDbContext.Rules.FindAsync(id);
                if(rule != null)
                {
                    _applicationDbContext.Rules.Remove(rule);
                    return await SaveAsync();
                }
                return false;
            }
            catch
            {
                return false;
            }           
        }

        // Get all
        public async Task<IEnumerable<Rule>> GetAllAsync()
        {
            await RuleSeedData.Seed(_applicationDbContext);
            return await _applicationDbContext.Rules.ToListAsync();
        }


        //Get by Id
        public async Task<Rule?> GetByIdAsync(Guid id)
        {
            try
            {
                var rule = await _applicationDbContext.Rules.FindAsync(id);
                return rule;
            }
            catch
            {
               return  null;
            }
        }

        //Save
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

        //Update
        public async Task<bool> UpdateAsync(Rule rule)
        {
            try
            {
                _applicationDbContext.Update(rule);
                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }
    }
}


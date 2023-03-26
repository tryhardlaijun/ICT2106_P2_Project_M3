﻿using SmartHomeManager.Domain.DeviceDomain.Interfaces;
using SmartHomeManager.Domain.DirectorDomain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartHomeManager.Domain.DeviceDomain.Services
{
    public class DeviceService : IDirectorControlDeviceService
    {
        public void Update(Guid deviceId, string configKey, int configVal)
        {
            Console.WriteLine(string.Format("Setting device's ({0}) [{1}] to [{2}]",deviceId, configKey, configVal));
        }
    }
}

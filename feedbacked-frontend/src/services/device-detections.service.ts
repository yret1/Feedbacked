import { Injectable } from '@angular/core';

export type BrowserType =
  | 'Chrome'
  | 'Mozilla'
  | 'Safari'
  | 'Edge'
  | 'Opera'
  | 'Internet Explorer'
  | 'Other';
export type DeviceType = 'Mobile' | 'Tablet' | 'Desktop' | 'Other';
export type OSType =
  | 'Mac OS'
  | 'Windows'
  | 'Linux'
  | 'iOS'
  | 'Android'
  | 'Other';
export interface DeviceInfo {
  browser: BrowserType;
  device: DeviceType;
}

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectionService {
  private readonly BROWSER_PATTERNS = [
    { pattern: /chrome/i, name: 'Chrome' as BrowserType },
    { pattern: /firefox|mozilla/i, name: 'Mozilla' as BrowserType },
    { pattern: /safari/i, name: 'Safari' as BrowserType },
    { pattern: /edge/i, name: 'Edge' as BrowserType },
    { pattern: /opera/i, name: 'Opera' as BrowserType },
    {
      pattern: /ie|internet explorer/i,
      name: 'Internet Explorer' as BrowserType,
    },
  ];

  private readonly DEVICE_PATTERNS = [
    { pattern: /mobile|iphone|android|phone/i, name: 'Mobile' as DeviceType },
    { pattern: /tablet|ipad/i, name: 'Tablet' as DeviceType },
    { pattern: /desktop|laptop|computer/i, name: 'Desktop' as DeviceType },
  ];

  private readonly OS_PATTERNS: Array<{ pattern: RegExp; name: OSType }> = [
    { pattern: /mac\s*os|macintosh/i, name: 'Mac OS' },
    { pattern: /windows/i, name: 'Windows' },
    { pattern: /linux/i, name: 'Linux' },
    { pattern: /ios/i, name: 'iOS' },
    { pattern: /android/i, name: 'Android' },
  ];

  detectOS(osString: string): OSType {
    return (
      this.OS_PATTERNS.find(({ pattern }) =>
        pattern.test(osString?.toLowerCase() ?? '')
      )?.name || 'Other'
    );
  }
  detectBrowser(browserString: string): BrowserType {
    return (
      this.BROWSER_PATTERNS.find(({ pattern }) =>
        pattern.test(browserString?.toLowerCase() ?? '')
      )?.name || 'Other'
    );
  }

  detectDevice(deviceString: string): DeviceType {
    return (
      this.DEVICE_PATTERNS.find(({ pattern }) =>
        pattern.test(deviceString?.toLowerCase() ?? '')
      )?.name || 'Other'
    );
  }

  getDeviceInfo(browserString: string, deviceString: string): DeviceInfo {
    return {
      browser: this.detectBrowser(browserString),
      device: this.detectDevice(deviceString),
    };
  }
}

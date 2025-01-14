// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */

// We extend the type definition of JSON.stringify because in some cases
// it can return undefined. This isn't strictly correct but it at least
// forces callers to handle the undefined case and prevent crashes.
// See issue https://github.com/microsoft/TypeScript/issues/18879
declare global {
  interface JSON {
    stringify(
      value: any,
      replacer?: (this: any, key: string, value: any) => any,
      space?: string | number,
    ): undefined | string;

    stringify(
      value: any,
      replacer?: (number | string)[] | null,
      space?: string | number,
    ): undefined | string;
  }
}

export {};

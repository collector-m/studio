// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import protobufjs from "protobufjs";

import { RosMsgField } from "@foxglove/rosmsg";

import { RosDatatypes } from "./types";

function protobufScalarToRosPrimitive(type: string): string {
  switch (type) {
    case "double":
      return "float64";
    case "float":
      return "float32";
    case "int32":
    case "sint32":
    case "sfixed32":
      return "int32";
    case "uint32":
    case "fixed32":
      return "uint32";
    case "int64":
    case "sint64":
    case "sfixed64":
      return "int64";
    case "uint64":
    case "fixed64":
      return "uint64";
    case "bool":
      return "bool";
    case "string":
      return "string";
  }
  throw new Error(`Expected protobuf scalar type, got ${type}`);
}

export function stripLeadingDot(typeName: string): string {
  return typeName.replace(/^\./, "");
}

export function protobufDefinitionsToDatatypes(
  datatypes: RosDatatypes,
  type: protobufjs.Type,
): void {
  const definitions: RosMsgField[] = [];
  for (const field of type.fieldsArray) {
    if (field.resolvedType instanceof protobufjs.Enum) {
      for (const [name, value] of Object.entries(field.resolvedType.values)) {
        // Note: names from different enums might conflict. The player API will need to be updated
        // to associate fields with enums (similar to the __foxglove_enum annotation hack).
        // https://github.com/foxglove/studio/issues/2214
        definitions.push({ name, type: "int32", isConstant: true, value });
      }
    } else if (field.resolvedType) {
      definitions.push({
        type: stripLeadingDot(field.resolvedType.fullName),
        name: field.name,
        isComplex: true,
        isArray: field.repeated,
      });
      protobufDefinitionsToDatatypes(datatypes, field.resolvedType);
    } else if (field.type === "bytes") {
      if (field.repeated) {
        throw new Error("Repeated bytes are not currently supported");
      }
      definitions.push({ type: "uint8", name: field.name, isArray: true });
    } else {
      definitions.push({
        type: protobufScalarToRosPrimitive(field.type),
        name: field.name,
        isArray: field.repeated,
      });
    }
  }
  datatypes.set(stripLeadingDot(type.fullName), { definitions });
}

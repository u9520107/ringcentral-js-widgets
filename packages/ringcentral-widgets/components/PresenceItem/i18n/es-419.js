import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
export default {
  [presenceStatus.available]: "Disponible",
  [presenceStatus.busy]: "Ocupado",
  [presenceStatus.offline]: "Invisible",
  [dndStatus.doNotAcceptAnyCalls]: "No molestar"
};

// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@

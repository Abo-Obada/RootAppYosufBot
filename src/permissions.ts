import { UserGuid, 
    rootServer
} from "@rootsdk/server-bot";


/**
 * Checks whether the user can ban or not.
 * @param evt has user's id 
 * @returns true if user has perm otherwise false
 */
export  async function canBan(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityCreateBan === true));
}

/**
 * Checks whether the user can kick or not.
 * @param evt has user's id 
 * @returns true if user has perm otherwise false
 */
export  async function canKick(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityKick === true));
}

//Check manage Community
export  async function canManageCommunity(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityManageCommunity === true));
}

//Check manage Community roles
export  async function canManageRole(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityManageRoles === true));
}

//Check manage Community Emojis
export  async function canManageEmojis(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityManageEmojis === true));
}

//Check manage community ManageAudit Log Emojis
export  async function canManageAuditLog(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityManageAuditLog === true));
}

//Check Create Invites
export  async function canCreateInvite(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityCreateInvite === true));
}

//Check Create Invites
export  async function canCreateManageInvite(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityManageInvites === true));
}

//Check manage bans
export  async function canManageBan(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityManageBans === true));
}

//Check full Control
export  async function canFullControl(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityFullControl === true));
}

//Check change nickname
export  async function canChangeMyNickname(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityChangeMyNickname === true));
}

//Check change other nickname
export  async function canChangeOtherNickname(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityChangeOtherNickname === true));
}

//Check create Channel group
export  async function canCreateGroup(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityCreateChannelGroup === true));
}

//Check Manage Apps
export  async function canManageApps(evt: UserGuid): Promise<boolean> {
const members = await rootServer.community.communityMembers.get({ userId: evt });
  if (!members.communityRoleIds || members.communityRoleIds.length === 0) {
    return false;
  }
  const roles = await rootServer.community.communityRoles.list();
  return roles.some(role => members.communityRoleIds!.some(memberId => memberId === role.id && role.communityPermission.communityManageApps === true));
}

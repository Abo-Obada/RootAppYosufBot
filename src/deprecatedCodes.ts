//This is where unwated codes live here........


//welcome users on welcome channel
// async function getWelcomeChannel(groupChannelName:string, channelName:string)  {
//   const getChannelGroups = await rootServer.community.channelGroups.list();

//   const channelGroup = getChannelGroups.find(n=>n.name === groupChannelName);
//     if(channelGroup && channelGroup.id){
//       const channelListRequestId:ChannelListRequest = {channelGroupId: channelGroup.id};
//       const channelsRequest:Channel[] = (await rootServer.community.channels.list(channelListRequestId));
//       const channels = channelsRequest.find(r=>r.name === channelName);
//       if(channels && channels.id){
//        return channels.id;
//       }
//     }
//     return undefined;
// }
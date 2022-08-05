import staffGroupUserList from '../models/staff_group_user_list.model'
import staffGroup from '../models/Staff_group.model'
import recruiterModel from '../models/recruiter.model'
import recruiterOwnUsers from '../models/recruiter_own_users.model'
import baseUserData from '../models/User_base_data.model'

interface groupResult {
  isGroupMember: boolean
  groupList: string[] | null
}

interface recruiterResult {
  isRecruiter: boolean
  staffIdList: string[] | null
}

export async function isGroupMemberCheck(userEmail: string) {
  let dataObj: groupResult = { isGroupMember: false, groupList: null }
  const checkGroupUsers: any = await staffGroupUserList.find()
  for (let i = 0; i <= checkGroupUsers.length - 1; i++) {
    for (let x = 0; x <= checkGroupUsers[i].staffEmailList.length - 1; x++) {
      if (checkGroupUsers[i].staffEmailList[x] === userEmail) {
        const curList: any = await staffGroup.find({ _id: checkGroupUsers[i].groupId })
        dataObj.isGroupMember = true
        dataObj.groupList = curList
      }
    }
  }
  return dataObj
}

export async function isRecruiterCheck(staffId: string) {
  let dataObj: recruiterResult = { isRecruiter: false, staffIdList: null }

  const isRecruiter: any = await recruiterModel.findOne({ recruiterId: staffId })
  if (!isRecruiter) {
    dataObj.isRecruiter = false
    dataObj.staffIdList = null
    return dataObj
  }

  const getOwnUsers: any = await recruiterOwnUsers.find({ recruiterId: staffId })
  let tempIdArray = []
  for (let i = 0; i <= getOwnUsers.length - 1; i++) {
    const staffUser: any = await baseUserData.findOne({ email: getOwnUsers[i].staffEmail })
    tempIdArray.push(staffUser.id)
  }
  dataObj.isRecruiter = true
  dataObj.staffIdList = tempIdArray

  console.log('dataObj from isRecruiter checker => ', dataObj);
  return dataObj
}

import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Utils/Responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    alignItems: 'center',
  },
  imageRowInner: {
    flexDirection: 'row',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: hp(2),
  },
  headerImage: {
    width: wp(75),
    height: hp(9),
    resizeMode: 'contain',
  },
  profileImage: {
    width: wp(40),
    height: hp(20),
    resizeMode: 'cover',
    borderRadius: wp(20),
    marginTop: hp(2),
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: hp(2),
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    maxWidth: wp(50),
    textAlign: 'center',
  },
  userPhone: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: hp(1),
  },
  groupSection: {
    marginHorizontal: wp(4),
    marginTop: hp(3),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: hp(1),
  },
  groupContainer: {
    backgroundColor: 'white',
    padding: hp(2),
    marginBottom: hp(1.5),
    borderRadius: 15,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupName: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupMembers: {
    color: 'green',
    fontSize: 14,
  },
  groupImage: {
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(2),
  },
  moreImagesContainer: {
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    fontSize: 12,
    color: 'black',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(4),
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    marginLeft: wp(1),
    color: 'black',
    fontWeight: 'bold',
  },
  noGroupContainer: {
    backgroundColor: 'red',
    padding: hp(2),
    borderRadius: 15,
    alignItems: 'center',
  },
  noGroupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupList: {
    paddingBottom: hp(5),
  },
  warningBanner: {
    backgroundColor: "orange",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  warningText: {
    color: "white",
    fontWeight: "bold",
  },
  enableButton: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  enableButtonText: {
    color: "orange",
    fontWeight: "bold",
  },
});

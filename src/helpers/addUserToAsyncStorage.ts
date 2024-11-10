import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  password: string;
  mobile: string;
}
const storeData = async (data: User) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export default storeData;

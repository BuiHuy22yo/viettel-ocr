import mqtt from 'mqtt';
import MqttClient from 'mqtt/src/lib/client';
import { useGlobSetting } from '@/hooks/setting';
import { useUserStore } from '@/store/modules/user';

const { mqttProtocol, mqttHost, mqttPort } = useGlobSetting();

export const getConnection = () => {
  try {
    const userStore = useUserStore();

    const endpoint = '/mqtt';
    const options = {
      username: userStore.getToken,
      password: '',
    };
    const connectUrl = `${mqttProtocol}://${mqttHost}:${mqttPort}${endpoint}`;
    const clientConnection = mqtt.connect(connectUrl, options);
    if (clientConnection?.on) {
      clientConnection.on('connect', () => {
        console.log('Connection succeeded!');
      });
      return clientConnection;
    }
  } catch (error) {
    console.log('mqtt.connect error', error);
    return null;
  }
};

export const subscribe = (mqttClientConnection: MqttClient, topic: any) => {
  try {
    mqttClientConnection.subscribe(topic, 0, (error, res) => {
      if (error) {
        console.log('Subscribe to topics error', error);
        return false;
      }
      console.log('Subscribe to topics res', res);
      return true;
    });
  } catch (error) {
    console.log('mqtt.subscribe error', error);
    return false;
  }
};

export const unsubscribe = (mqttClientConnection: MqttClient, topic: any) => {
  try {
    mqttClientConnection.unsubscribe(topic, (error) => {
      if (error) {
        console.log('Unsubscribe error', error);
      }
      return true;
    });
  } catch (error) {
    console.log('mqtt.unsubscribe error', error);
    return false;
  }
};

export const publish = (mqttClientConnection: MqttClient, topic: any, payload: any) => {
  try {
    mqttClientConnection.publish(topic, payload, 0, (error) => {
      if (error) {
        console.log('Publish error', error);
      }
      return true;
    });
  } catch (error) {
    console.log('mqtt.publish error', error);
    return false;
  }
};

export const destroyConnection = (mqttClientConnection: MqttClient) => {
  try {
    if (mqttClientConnection.connected) {
      try {
        mqttClientConnection.end(false, () => {
          console.log('Successfully disconnected!');
          return true;
        });
      } catch (error) {
        console.log('Disconnect failed', error.toString());
        return false;
      }
    }
  } catch (error) {
    console.log('mqtt.destroyConnection error', error);
    return false;
  }
};

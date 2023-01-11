package it.tfobz;

import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class eChargingTest {
    public static void main(String[] args) throws UnirestException {
        
        Unirest.setTimeouts(0, 0);
        HttpResponse<String> response = Unirest
                .get("https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation")
                .asString();
        JSONObject obj = new JSONObject(response.getBody());

        for (int i = 0; i < obj.getJSONArray("data").length(); i++) {
            eChargingWrapper wrapper = new eChargingWrapper(i);
            System.out.print(wrapper.isActive() + ";");
            System.out.print(wrapper.isAvailable() + ";");
            System.out.print(wrapper.getCode() + ";");
            System.out.print(wrapper.getX() + ";");
            System.out.print(wrapper.getY() + ";");
            System.out.print(wrapper.getCity() + ";");
            System.out.print(wrapper.getState() + ";");
            System.out.print(wrapper.getAddress() + ";");
            System.out.print(wrapper.getCapacity() + ";");
            System.out.print(wrapper.getProvider() + ";");
            System.out.print(wrapper.getName() + ";");
            System.out.print(wrapper.getOrigin() + ";");
            System.out.println();
        }

    }
}

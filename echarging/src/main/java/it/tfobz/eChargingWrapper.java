package it.tfobz;

import org.json.JSONObject;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class eChargingWrapper {

    private JSONObject obj = getData();

    private boolean active;
    private boolean available;
    private String code;
    private double x;
    private double y;
    private String city;
    private String state;
    private String address;
    private int capacity;
    private String provider;
    private String name;
    private String origin;

    public eChargingWrapper(int i) throws UnirestException {
        this.active = this.obj.getJSONArray("data").getJSONObject(i).getBoolean("sactive");
        this.available = this.obj.getJSONArray("data").getJSONObject(i).getBoolean("savailable");
        this.code = this.obj.getJSONArray("data").getJSONObject(i).getString("scode");
        this.x = this.obj.getJSONArray("data").getJSONObject(i).getJSONObject("scoordinate").getDouble("x");
        this.y = this.obj.getJSONArray("data").getJSONObject(i).getJSONObject("scoordinate").getDouble("y");
        this.city = this.obj.getJSONArray("data").getJSONObject(i).getJSONObject("smetadata").getString("city");
        this.state = this.obj.getJSONArray("data").getJSONObject(i).getJSONObject("smetadata").getString("state");
        this.address = this.obj.getJSONArray("data").getJSONObject(i).getJSONObject("smetadata").getString("address");
        this.capacity = this.obj.getJSONArray("data").getJSONObject(i).getJSONObject("smetadata").getInt("capacity");
        this.provider = this.obj.getJSONArray("data").getJSONObject(i).getJSONObject("smetadata")
                .getString("provider");
        this.name = this.obj.getJSONArray("data").getJSONObject(i).getString("sname");
        this.origin = this.obj.getJSONArray("data").getJSONObject(i).getString("sorigin");
    }

    public JSONObject getData() {
        Unirest.setTimeouts(0, 0);
        JSONObject obj = null;
        try {
            HttpResponse<String> response = Unirest
                    .get("https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation")
                    .asString();
            obj = new JSONObject(response.getBody());
        } catch (UnirestException e) {
            System.out.println(e.getMessage());
        }
        return obj;
    }

    public boolean isActive() throws UnirestException {
        return this.active;
    }

    public boolean isAvailable() throws UnirestException {
        return this.available;
    }

    public String getCode() throws UnirestException {
        return this.code;
    }

    public double getX() throws UnirestException {
        return this.x;
    }

    public double getY() throws UnirestException {
        return this.y;
    }

    public String getCity() throws UnirestException {
        return this.city;
    }

    public String getState() throws UnirestException {
        return this.state;
    }

    public String getAddress() throws UnirestException {
        return this.address;
    }

    public int getCapacity() throws UnirestException {
        return this.capacity;
    }

    public String getProvider() throws UnirestException {
        return this.provider;
    }

    public String getName() throws UnirestException {
        return this.name;
    }

    public String getOrigin() throws UnirestException {
        return this.origin;
    }

}

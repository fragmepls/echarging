package net.tfobz;

import org.json.JSONObject;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class EchargingMain {

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

    public EchargingMain(int i) throws UnirestException {
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

    @Override
    public String toString() {
        return "eChargingWrapper [active="
                + active + ", available="
                + available + ", code="
                + code + ", x="
                + x + ", y="
                + y + ", city="
                + city + ", state="
                + state + ", address="
                + address + ", capacity="
                + capacity + ", provider="
                + provider + ", name="
                + name + ", origin="
                + origin + "]";
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

}
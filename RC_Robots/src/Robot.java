import java.util.List;
import java.util.Set;

public class Robot {

    private int x, y, z;
    private String direction;
    private final int maxX;
    private final int maxY;
    private final int minX;
    private final int minY;
    private final int maxZ;
    private final int minZ;

    private static  List<String> DIRECTIONS = List.of("N", "NE", "E", "ES", "S", "SW", "W", "WN");

    public Robot(int x, int y, int z, String direction, int maxX, int maxY, int minX, int minY, int maxZ, int minZ){
        this.x = x;
        this.y = y;
        this.z = z;
        this.direction = direction;
        this.maxX = maxX;
        this.maxY = maxY;
        this.minX = minX;
        this.minY = minY;
        this.minZ = minZ;
        this.maxZ = maxZ;
    }

    public void turnRight(){
        int currentIndex = DIRECTIONS.indexOf(this.direction);
        this.direction = DIRECTIONS.get((currentIndex + 1) % DIRECTIONS.size());
    }

    public void turnLeft(){
        int currentIndex = DIRECTIONS.indexOf(this.direction);
        this.direction = DIRECTIONS.get((currentIndex + DIRECTIONS.size()-1) % DIRECTIONS.size());
    }

    private void goDown() {
        if(z>minZ) z--;
    }

    private void goUp() {
        if(z<maxZ) z++;
    }

    public void moveForward(){
        switch (this.direction){
            case "N": if(y < maxY) y++; break;
            case "E": if(x < maxX) x++; break;
            case "S": if(y > minY) y--; break;
            case "W": if(x > minX) x--; break;
            case "NE": if(y < maxY && x< maxX){ y++; x++;} break;
            case "ES": if(x < maxX && y>minY) { x++; y--;}break;
            case "SW": if(y > minY && x>minX) {y--; x--; }break;
            case "WN": if(x > minX && y<maxY) {x--; y++;} break;
        }

    }

    public void executeCommands(String commands) {
        for(char command: commands.toCharArray()) {
            switch (command) {
                case 'L' : turnLeft(); break;
                case 'R' : turnRight(); break;
                case 'M' : moveForward(); break;
                case 'U' : goUp(); break;
                case 'D' : goDown(); break;
            }
        }
    }

    public String toString() {
        return x + " " + y + " " + z +" "+ direction;
    }

}

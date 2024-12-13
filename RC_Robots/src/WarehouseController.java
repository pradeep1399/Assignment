import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class WarehouseController {

    public static void main(String[] args) {

        int maxX = 2;
        int maxY = 2;
        int minX = -1;
        int minY = -1;
        int minZ = -1;
        int maxZ = 2;

        Robot robot1 = new Robot(0, 0, 0, "NE", maxX, maxY, minX, minY, maxZ, minZ);
        robot1.executeCommands("MMRUUD");

//        Robot robot2 = new Robot(3, 2, 'E', maxX, maxY);
//        robot2.executeCommands("MLLMMRMM");

        System.out.println(robot1);
//        System.out.println(robot2);
    }
}
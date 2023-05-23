public class GameTime {
    private long startTime;

    public GameTime() {
        startTime = System.currentTimeMillis();
    }

    public long getElapsedSeconds() {
        long currentTime = System.currentTimeMillis();
        long elapsedMilliseconds = currentTime - startTime;
        long elapsedSeconds = elapsedMilliseconds / 1000;
        return elapsedSeconds;
    }

    public void reset() {
        startTime = System.currentTimeMillis();
    }

    // Usage example:
    public static void main(String[] args) {
        GameTime gameTimer = new GameTime();

        // Wait for 5 seconds
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        long elapsedSeconds = gameTimer.getElapsedSeconds();
        System.out.println("Elapsed seconds: " + elapsedSeconds);
    }
}

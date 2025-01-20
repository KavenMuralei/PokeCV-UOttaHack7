import pygame
import cv2
import numpy as np

# Initialize Pygame
pygame.init()

# Set up the display
width, height = 640, 480
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Camera Stream")

# Open the camera
cap = cv2.VideoCapture(0)

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            x, y = pygame.mouse.get_pos()
            # Take a photo
            ret, frame = cap.read()
            if ret:
                cv2.imwrite(f"photo_{x}_{y}.jpg", frame)
                print(f"Photo taken at ({x}, {y})")

    # Read the camera frame
    ret, frame = cap.read()
    if ret:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = np.rot90(frame)
        frame = pygame.surfarray.make_surface(frame)
        screen.blit(frame, (0, 0))

    pygame.display.flip()

# Release the camera and quit Pygame
cap.release()
pygame.quit()


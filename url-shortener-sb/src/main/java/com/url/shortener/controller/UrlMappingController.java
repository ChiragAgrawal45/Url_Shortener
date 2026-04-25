package com.url.shortener.controller;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    private UrlMappingService urlMappingService;
    private UserService userService;

    // ✅ CREATE SHORT URL
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(
            @RequestBody Map<String, String> request,
            Principal principal
    ) {
        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());

        UrlMappingDTO urlMappingDTO =
                urlMappingService.createShortUrl(originalUrl, user);

        return ResponseEntity.ok(urlMappingDTO);
    }

    // ✅ GET USER URLS
    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    // ✅ FIXED ANALYTICS API (MOST IMPORTANT)
    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(
            @PathVariable String shortUrl,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate
    ) {
        try {
            // ✅ Accept simple date format (YYYY-MM-DD)
            LocalDate startDateParsed = LocalDate.parse(startDate);
            LocalDate endDateParsed = LocalDate.parse(endDate);

            // ✅ Convert to full day range
            LocalDateTime start = startDateParsed.atStartOfDay();
            LocalDateTime end = endDateParsed.atTime(23, 59, 59);

            List<ClickEventDTO> data =
                    urlMappingService.getClickEventsByDate(shortUrl, start, end);

            // ✅ Prevent null → return empty list
            return ResponseEntity.ok(data != null ? data : List.of());

        } catch (Exception e) {
            e.printStackTrace();

            // ✅ No crash → return empty list
            return ResponseEntity.ok(List.of());
        }
    }

    // ✅ TOTAL CLICKS GRAPH
    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(
            Principal principal,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate
    ) {
        User user = userService.findByUsername(principal.getName());

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        Map<LocalDate, Long> totalClicks =
                urlMappingService.getTotalClicksByUserAndDate(user, start, end);

        return ResponseEntity.ok(totalClicks);
    }
}